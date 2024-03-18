// import { BVH } from './lib/bvh.js'
// import * as FileSystem from 'expo-file-system';

// export function parseFile(fileName: string): void {
// console.log("Hiya");
// FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
// .then((result) => console.log(result))
// FileSystem.readAsStringAsync(`file://${fileName}`)
// .then((_) => {console.log('bleh')})
// .then((data) => console.log(data))
// RNFS.readFile(fileName)
// }

export class SkeletonNode {
	parent: SkeletonNode | null;
	name: string;
	joints: Array<SkeletonNode> = [];

	constructor(parent: SkeletonNode | null, name = "") {
		this.parent = parent;
		this.name = name;
	}
}

const parseLine = (l: string) => l.split(" ").filter((word) => (word != ""));

function addChildren(
	data: Array<string>,
	parent: SkeletonNode,
	i = 0,
): [number, SkeletonNode] {
	while (i < data.length) {
		const rawLine = data[i];
		const line = parseLine(rawLine);
		switch (line[0]) {
			case "{": {
				break;
			}
			case "}": {
				return [i, parent];
			}
			case "JOINT": {
				console.log(line[1]);
				let node: SkeletonNode;
				[i, node] = addChildren(data, new SkeletonNode(parent, line[1]), i + 1);
				parent.joints.push(node);
				break;
			}
			case "End": {
				i += 3;
			}
		}
		i++;
	}
	return [i + 1, parent];
}

function flattenStructure(root: SkeletonNode): Array<SkeletonNode> {
	let nodes: Array<SkeletonNode> = [root];

	const pushJoints = (node: SkeletonNode) => {
		node.joints.forEach((joint: SkeletonNode) => {
			nodes.push(joint);
			pushJoints(joint);
		});
	};

	pushJoints(root);

	return nodes;
}

function parseStructure(structure: string): SkeletonNode {
	return addChildren(structure.split("\n"), new SkeletonNode(null, "ROOT"))[1];
}

export class Keyframe {
	node: SkeletonNode;
	positionX: number;
	positionY: number;
	positionZ: number;
	rotationX: number;
	rotationY: number;
	rotationZ: number;

	constructor(
		positionX: number,
		positionY: number,
		positionZ: number,
		rotationX: number,
		rotationY: number,
		rotationZ: number,
		node: SkeletonNode,
	) {
		this.node = node;
		this.positionX = positionX;
		this.positionY = positionY;
		this.positionZ = positionZ;
		this.rotationX = rotationX;
		this.rotationY = rotationY;
		this.rotationZ = rotationZ;
	}
}

export type Animation = Array<Array<Keyframe>>;

function parseKeyframes(data: string, nodes: Array<SkeletonNode>): Animation {
	const frames: Animation = [];
	data.split("\n").slice(3).forEach((rawLine) => {
		const frame: Array<Keyframe> = [];
		const line = rawLine.split(" ").map((n) => parseFloat(n));
		for (let i = 0; i < line.length; i += 6) {
			frame.push(
				new Keyframe(
					line[i + 0],
					line[i + 1],
					line[i + 2],
					line[i + 3],
					line[i + 4],
					line[i + 5],
					nodes[i / 6],
				),
			);
		}
		frames.push(frame);
	});
	return frames;
}

export function parseData(data: string): {structure: SkeletonNode, animation: Animation} {
	const [structure, animation] = data.split("MOTION");
	const struct = parseStructure(structure);
	const anim = parseKeyframes(animation, flattenStructure(struct));
	return {structure: struct, animation: anim};
}

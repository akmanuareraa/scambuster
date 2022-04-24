[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "addSite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isScam",
				"type": "bool"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_nominee",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "siteAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_validator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bool",
				"name": "_isScam",
				"type": "bool"
			}
		],
		"name": "voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			}
		],
		"name": "getVoteStatus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "sitelist",
		"outputs": [
			{
				"internalType": "address",
				"name": "nominee",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "comment",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yesVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
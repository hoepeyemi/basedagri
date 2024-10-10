/* eslint-disable no-mixed-spaces-and-tabs */
export const recycleABI = [
	{
	  "type": "constructor",
	  "name": "",
	  "inputs": [
		{
		  "type": "address",
		  "name": "_recyloxAddress",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "event",
	  "name": "CompanyActiveStatusUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "bool",
		  "name": "newActiveStatus",
		  "indexed": false,
		  "internalType": "bool"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CompanyEdited",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "name",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "minWeightRequirement",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "maxPricePerKg",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "active",
		  "indexed": false,
		  "internalType": "bool"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CompanyMaxPricePerKgUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "newMaxPricePerKg",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CompanyMinWeightRequirementUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "newMinWeightRequirement",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CompanyNameUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "newName",
		  "indexed": false,
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CompanyRegistered",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "name",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "minWeightRequirement",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "maxPricePerKg",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "active",
		  "indexed": false,
		  "internalType": "bool"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OwnershipTransferred",
	  "inputs": [
		{
		  "type": "address",
		  "name": "previousOwner",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "newOwner",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PickerEdited",
	  "inputs": [
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "name",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "type": "string",
		  "name": "email",
		  "indexed": false,
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PickerEmailUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "newEmail",
		  "indexed": false,
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PickerNameUpdated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "newName",
		  "indexed": false,
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PickerPaid",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": false,
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "recipient",
		  "indexed": false,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "amount",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PickerRegistered",
	  "inputs": [
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "string",
		  "name": "name",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "type": "string",
		  "name": "email",
		  "indexed": false,
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PlasticDeposited",
	  "inputs": [
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "weight",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PlasticValidated",
	  "inputs": [
		{
		  "type": "address",
		  "name": "companyAddress",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "transactionId",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "function",
	  "name": "balanceOf",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "companies",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "string",
		  "name": "name",
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "minWeightRequirement",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "maxPricePerKg",
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "active",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "companyAddresses",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "depositPlastic",
	  "inputs": [
		{
		  "type": "address",
		  "name": "_companyAddress",
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "_weight",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "transactionId",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "editCompany",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "_minWeightRequirement",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "_maxPricePerKg",
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "_active",
		  "internalType": "bool"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "success",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "editPicker",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		},
		{
		  "type": "string",
		  "name": "_email",
		  "internalType": "string"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "success",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "getCompany",
	  "inputs": [
		{
		  "type": "address",
		  "name": "_address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "tuple",
		  "name": "",
		  "components": [
			{
			  "type": "string",
			  "name": "name",
			  "internalType": "string"
			},
			{
			  "type": "uint256",
			  "name": "minWeightRequirement",
			  "internalType": "uint256"
			},
			{
			  "type": "uint256",
			  "name": "maxPricePerKg",
			  "internalType": "uint256"
			},
			{
			  "type": "bool",
			  "name": "active",
			  "internalType": "bool"
			}
		  ],
		  "internalType": "struct Recycle.Company"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getPicker",
	  "inputs": [
		{
		  "type": "address",
		  "name": "_address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "tuple",
		  "name": "",
		  "components": [
			{
			  "type": "string",
			  "name": "name",
			  "internalType": "string"
			},
			{
			  "type": "string",
			  "name": "email",
			  "internalType": "string"
			},
			{
			  "type": "uint256",
			  "name": "weightDeposited",
			  "internalType": "uint256"
			},
			{
			  "type": "uint256[]",
			  "name": "transactions",
			  "internalType": "uint256[]"
			}
		  ],
		  "internalType": "struct Recycle.Picker"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getRegisteredCompanyCount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "count",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getRegisteredPickerCount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "count",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "owner",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "payPicker",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "_transactionId",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "pickerAddresses",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pickers",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "string",
		  "name": "name",
		  "internalType": "string"
		},
		{
		  "type": "string",
		  "name": "email",
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "weightDeposited",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "registerCompany",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		},
		{
		  "type": "uint256",
		  "name": "_minWeightRequirement",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "_maxPricePerKg",
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "_active",
		  "internalType": "bool"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "success",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "registerPicker",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		},
		{
		  "type": "string",
		  "name": "_email",
		  "internalType": "string"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "success",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "renounceOwnership",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "totalTransactions",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "transactions",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "id",
		  "internalType": "uint256"
		},
		{
		  "type": "address",
		  "name": "companyAddress",
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "pickerAddress",
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "weight",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "price",
		  "internalType": "uint256"
		},
		{
		  "type": "bool",
		  "name": "isApproved",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "transferOwnership",
	  "inputs": [
		{
		  "type": "address",
		  "name": "newOwner",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updateCompanyActiveStatus",
	  "inputs": [
		{
		  "type": "bool",
		  "name": "_active",
		  "internalType": "bool"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updateCompanyMaxPricePerKg",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "_maxPricePerKg",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updateCompanyMinWeightRequirement",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "_minWeightRequirement",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updateCompanyName",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updatePickerEmail",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_email",
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updatePickerName",
	  "inputs": [
		{
		  "type": "string",
		  "name": "_name",
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "validatePlastic",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "_transactionId",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "success",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	}
  ]
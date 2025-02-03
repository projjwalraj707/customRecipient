import age from "./newAge.js"
import {bech32} from "@scure/base"
import {randomBytes} from "crypto"

class Stanza {
	args; //type: string[]
	body; //type: Uint8Array
	constructor(args, body) {
		this.args = args;
		this.body = body;
	}
}

class customIdentity {
	recipient; //type: Recipient
	constructor(s) {
		const res = bech32.decodeToBytes(s);
		this.recipient = res.bytes;
	}
	async wrapFileKey(fileKey) {
		return [new Stanza(["PROJJRJ", "SomeGarbageValue"], randomBytes(32))]
	}
}

export async function testFunction () {
	const customString = await age.generateIdentity(); //a random string to feed the customRecipient's constructor since bech32.decodeToBytes() only accepts formatted string
	const myRecipient = new customIdentity(customString)
	const e = new age.Encrypter();
	e.addRecipient(myRecipient); //inserting customRecipient to age's encrypter. If this does not throw any error, this means that age's ecrypter has accepted the customReciepint
	const cipherText = await e.encrypt("Hello World")
	return cipherText; 
}

console.log(await testFunction()); //if this is printed successfully, this means that all the above code were successfully executed and are working as expected.

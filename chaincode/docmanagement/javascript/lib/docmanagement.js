/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class DocManagement extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const docs = [
            {
                name: 'arjun',
                owner: 'arjun',
                state: 'new',
                ipfsLink: 'QmYvs9KCmtNb2taN1D4isjEXs3Z7WJL2D77UgbhYBZUEeZ',                
            }
        ];

        for (let i = 0; i < docs.length; i++) {
            docs[i].docType = 'doc';
            await ctx.stub.putState('DOC' + i, Buffer.from(JSON.stringify(docs[i])));
            console.info('Added <--> ', docs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

 

    // async createDoc(ctx, docNumer, name, owner, ipfsLink) {
    //     console.info('============= START : Create Document ===========');

    //     const doc = {
    //         name,
    //         docType: 'docs',
    //         owner,
    //         state: 'New',
    //         ipfsLink,
    //     };

    //     await ctx.stub.putState(docNumer, Buffer.from(JSON.stringify(doc)));
    //     console.info('============= END : Create Document ===========');
    // }

    async queryAllDocument(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    // async queryDocument(ctx, docNumer) {
    //     const docAsBytes = await ctx.stub.getState(docNumer); 
    //     if (!docAsBytes || docAsBytes.length === 0) {
    //         throw new Error(`${docNumer} does not exist`);
    //     }
    //     console.log(docAsBytes.toString());
    //     return docAsBytes.toString();
    // }
    
    // async changeDocOwner(ctx, docNumer, newOwner) {
    //     console.info('============= START : changeDocOwner ===========');

    //     const docAsBytes = await ctx.stub.getState(docNumer); 
    //     if (!docAsBytes || docAsBytes.length === 0) {
    //         throw new Error(`${docNumer} does not exist`);
    //     }
    //     const doc = JSON.parse(docAsBytes.toString());
    //     doc.owner = newOwner;

    //     await ctx.stub.putState(docNumer, Buffer.from(JSON.stringify(doc)));
    //     console.info('============= END : changeDocOwner ===========');
    // }

    // async changeDocState(ctx, docNumer, state) {
    //     console.info('============= START : changeDocState ===========');

    //     const docAsBytes = await ctx.stub.getState(docNumer); // get the doc from chaincode state
    //     if (!docAsBytes || docAsBytes.length === 0) {
    //         throw new Error(`${docNumer} does not exist`);
    //     }
    //     const doc = JSON.parse(docAsBytes.toString());
    //     doc.state = state;

    //     await ctx.stub.putState(docNumer, Buffer.from(JSON.stringify(doc)));
    //     console.info('============= END : changeDocState ===========');
    // }


}

module.exports = DocManagement;

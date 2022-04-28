const { Client } = require('@elastic/elasticsearch')
const fs = require('fs');

const client = new Client({
        node: 'https://localhost:9200',
        auth: {
          username: 'elastic',
          password: '9A117+01p=+Q2UVVKhXZ'
        },
        tls: {
          ca: fs.readFileSync('./http_ca.crt'),
          rejectUnauthorized: false
        }
      });
      
      await client.index({
          index: 'game-of-thrones',
          document: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
          }
        })
      
        await client.index({
          index: 'game-of-thrones',
          document: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
          }
        })
      
        await client.index({
          index: 'game-of-thrones',
          document: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
          }
        })
      
        // here we are forcing an index refresh, otherwise we will not
        // get any result in the consequent search
        await client.indices.refresh({ index: 'game-of-thrones' })

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

async function createData(Searchindex='game-of-thrones'){
    
    await client.index({
        index: Searchindex,
        document: {
          character: 'Ned Stark',
          quote: 'Winter is coming.'
        }
      })
    
      await client.index({
        index: Searchindex,
        document: {
          character: 'Daenerys Targaryen',
          quote: 'I am the blood of the dragon.'
        }
      })
    
      await client.index({
        index: Searchindex,
        document: {
          character: 'Tyrion Lannister',
          quote: 'A mind needs books like a sword needs a whetstone.'
        }
      })
    
      // here we are forcing an index refresh, otherwise we will not
      // get any result in the consequent search
      await client.indices.refresh({ index: Searchindex })
             
}

async function getSingleItem(Searchindex, id ){
    const document = await client.get({
        index: Searchindex,
        id: id
    });
      
    console.log( document );
}

async function search(Searchindex='game-of-thrones', term = 'Tyrion', ){
    const result = await client.search({
        index: Searchindex,
        query: {
            match: { quote: term }
        }
    });

    console.log( result?.hits?.hits)
}

async function deleteDoc(Searchindex, term){
    const result = await client.deleteByQuery({
        index: Searchindex,
        query: {
            match: { quote: term }
        }
    });

    console.log( result )
    
}

// deleteDoc('game-of-thrones', 'Winter') ;

// search('game-of-thrones', 'Winter') ;

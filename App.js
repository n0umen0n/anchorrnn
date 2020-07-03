import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'

const transport = new AnchorLinkBrowserTransport()
// initialize the link, this time we are using the TELOS chain
const link = new AnchorLink({transport,
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    rpc: 'https://kylin-dsp-2.liquidapps.io'
})
// the EOSIO action we want to sign and broadcast
const action = {
    account: 'andrtestcons',
    name: 'createpollz',
    authorization: [{
        actor: '............1', // ............1 will be resolved to the signing accounts permission
        permission: '............2' // ............2 will be resolved to the signing accounts authority
    }],
    data: {
      question: "Question?",
      answers: ["First", "Second", "Third", "Last"],
      totalvote: [0,0,0,100],
      community: "eyaltestcons",
      creator: "andrtestcons"
    }
}
// ask the user to sign the transaction and then broadcast to chain
function vote() {
    link.transact({action})
        .then((result) => {
            document.body.innerHTML = `<h1>Thank you ${ result.signer.actor }!</h1>`
        })
}


export default function App() {
  return (
    <View>
      <Button
      onPress={vote()}
      title="Vote"
      color="#841584"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

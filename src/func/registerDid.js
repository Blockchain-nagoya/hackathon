import {
  RestClient, CONST
} from 'ontology-ts-sdk';

const registerDid = async(tx) => {
  const rest = new RestClient(CONST.TEST_ONT_URL.REST_URL);
  rest.sendRawTransaction(tx.serialize()).then(res => {
    console.log(res);
  });
}
export default registerDid;
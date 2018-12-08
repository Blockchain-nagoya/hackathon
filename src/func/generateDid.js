import {
  Identity
} from 'ontology-ts-sdk';

const generateDid = async(privateKey, password, label) => {

  const identity = Identity.create(privateKey, password, label);
  console.log(identity.ontid);

  return identity.ontid;
}
export default generateDid;
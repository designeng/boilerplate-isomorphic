import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

const model = new Falcor.Model({
    source: new FalcorDataSource('http://localhost:3000/contacts/model.json')
});

export default model;
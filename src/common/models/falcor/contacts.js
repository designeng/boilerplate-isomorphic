import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';

export default new Falcor.Model({
    source: new FalcorDataSource('http://localhost:3000/contacts/model.json')
});
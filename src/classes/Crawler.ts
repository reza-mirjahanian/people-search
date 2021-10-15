import _ from 'lodash';
import axios from 'axios';

import constants from '../constants';
import Logger from '../utils/logger';

export default class Crawler {

    HOST = 'https://www.peoplesearchexpert.com'
    PATH = '/search'
    API_URL = ''
    constructor() {
        this.API_URL = `${this.HOST}${this.PATH}`;
    }

    private isResponseEmpty(contents: string) {
        return contents.includes(constants.NOT_FOUND_STRING);
    }

    private countRecordsInResponse(contents: string) {
        const regexp = new RegExp('([1-9]\\d*)\\s+records\\s+found','g');
        const matches = [...contents.matchAll(regexp)];
        return _.toNumber(_.get(matches,'[0][1]', -1));
    }

    private isResponseContainExactName(text: string, firstName: string, middleName: string, lastName: string) {
        if (!_.isString(middleName) || _.size(middleName) < 1) {
            middleName = ''
        } else {
            middleName += '\\s+'
        }
        const regexp = new RegExp(`col-green">${firstName}\\s+${middleName}${lastName}</h3>`, 'g');
        return regexp.test(text);
    }


    /**
     * Return the list of non-lead components.
     * https://www.peoplesearchexpert.com/search?q[full_name]=Bob+Smith&q[location]=Houston,+TX
     * If the given pii is present on the website, return the url where the information is listed
     * @return {Promise<string>} URL or '' if not found!
     */
    async searchPeople(
        firstName: string,
        lastName: string,
        middleName: string,
        state: string,
        city: string
    ) {
        try {
            Logger.log(`------- START -------- FirsName: "${firstName}" ,Middle: "${middleName}"  ,LastName: "${lastName}"` )
            state = _.trim(state).toLowerCase();
            firstName = _.trim(firstName);
            lastName = _.trim(lastName);
            city = _.trim(city);

            const stateShort = constants.STATE_DICTIONARY[state];
            if (!stateShort) {
                throw Error('Short state not found in dictionary!')
            }
            const url = `${this.API_URL}?q[full_name]=${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&q[location]=${encodeURIComponent(city)},+${stateShort}`;
            console.log(url)

            const {
                data: htmlPage
            }: { data: string } = await axios.get(url);

            if (this.isResponseEmpty(htmlPage)) {
                return '';
            }

            //Just extra info ;)
            const isIncludeExactName = this.isResponseContainExactName(htmlPage,firstName,middleName,lastName);
            const recordsCount = this.countRecordsInResponse(htmlPage);
            Logger.log('Is There is a exact match: ' + isIncludeExactName )
            Logger.log('Records found: ' + recordsCount)

            return url;
        } catch (e) {
            Logger.error("Crawler:searchPeople()", {e});
            throw e;
        }
    }


}

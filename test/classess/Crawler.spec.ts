const {
    expect
} = require("chai");
import fs from 'fs'
import path from 'path'

import nock from 'nock';
import Crawler from '../../src/classes/Crawler';

import {
    URLSearchParams
} from "url";

const mockDataNotFound = fs.readFileSync(path.resolve(__dirname, '../testData/mockDataNotFound.html'), 'utf8')
const mockDataBobSmith = fs.readFileSync(path.resolve(__dirname, '../testData/BobSmith/mockData.html'), 'utf8')
const mockDataRobJEdmiston = fs.readFileSync(path.resolve(__dirname, '../testData/RobJEdmiston/mockDataMiddleName.html'), 'utf8')
const mockDataPagination = fs.readFileSync(path.resolve(__dirname, '../testData/pagination/mockDataJohn.html'), 'utf8')


suite('Testing Crawler Repository', () => {
    suite('async searchPeople()', () => {
        test('should return empty string when not found the person ', async () => {
            const crawler = new Crawler();
            const firstName = 'sdsds';
            const lastName = 'Smith';
            const middleName = '';
            const state = 'Texas';
            const city = 'Houston';
            const queryNotFound = `?q[full_name]=${firstName}+${lastName}&q[location]=${city},+TX`;
            nock(crawler.HOST)
                .get(crawler.PATH)
                .query(new URLSearchParams(queryNotFound))
                .reply(200, mockDataNotFound); // Not found!.
            const result = await crawler.searchPeople(firstName, lastName, middleName, state, city);
            expect(result).to.be.equal('');
            nock.cleanAll();
        });

        test('should return the url where the information is listed', async () => {
            const crawler = new Crawler();
            const firstName = 'Bob';
            const lastName = 'Smith';
            const middleName = '';
            const state = 'Texas';
            const city = 'Houston';
            const queryBobSmith = `?q[full_name]=${firstName}+${lastName}&q[location]=${city},+TX`;
            nock(crawler.HOST)
                .get(crawler.PATH)
                .query(new URLSearchParams(queryBobSmith))
                .reply(200, mockDataBobSmith); //1 records found
            const result = await crawler.searchPeople(firstName, lastName, middleName, state, city);
            expect(result).to.be.equal(crawler.API_URL + queryBobSmith);
            nock.cleanAll();
        });

        test('should return the url with middle name where the information is listed', async () => {
            const crawler = new Crawler();
            const firstName = 'Rob';
            const lastName = 'Edmiston';
            const middleName = 'J';
            const state = 'Ohio';
            const city = 'Columbus';
            const queryRobJEdmiston = `?q[full_name]=${firstName}+${lastName}&q[location]=${city},+OH`;
            nock(crawler.HOST)
                .get(crawler.PATH)
                .query(new URLSearchParams(queryRobJEdmiston))
                .reply(200, mockDataRobJEdmiston); //1 records found
            const result = await crawler.searchPeople(firstName, lastName, middleName, state, city);
            expect(result).to.be.equal(crawler.API_URL + queryRobJEdmiston);
            nock.cleanAll();
        });

        test('should return the url with pagination where the information is listed', async () => {
            const crawler = new Crawler();
            const firstName = 'john';
            const lastName = '';
            const middleName = '';
            const state = 'new york';
            const city = 'Nyack';
            const queryJohn = `?q[full_name]=${firstName}+${lastName}&q[location]=${city},+NY`;
            nock(crawler.HOST)
                .get(crawler.PATH)
                .query(new URLSearchParams(queryJohn))
                .reply(200, mockDataPagination); // 485 records found
            const result = await crawler.searchPeople(firstName, lastName, middleName, state, city);
            expect(result).to.be.equal(crawler.API_URL +  queryJohn);
            nock.cleanAll();
        });

    });


});


### People Search Task
Write a simple program for querying the given website for the given pii.



#### Setup
- Node.JS 14 ( or later )
- Install dependencies `yarn` or `npm i`
- `npm start` - Runs project.
- `npm test` - Runs tests.
- `npm run coverage` - Runs code coverage.

[Pagination Example](https://www.peoplesearchexpert.com/?q%5Bfull_name%5D=john&q%5Blocation%5D=Texas%20City,%20TX)

#### Assumptions
- ✅ 'Middle Initial' doesn't work directly in the search field. Just in response.
- ✅ I wasn't sure, should I return the URL if there is not an exact match with the Middle Initial, but there are results in response.
- ✅ Apparently, We should use abbreviation names for states.
- ✅ Accept only English chars, not Unicode.

#### Todo
- 💡 Handle pagination

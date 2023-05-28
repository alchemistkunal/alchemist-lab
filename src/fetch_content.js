import axios from 'axios';

const fetchHeadlineData = async () => {
    try {
        const notionDbId = process.env.NOTION_DB_PROFILE;
        const notionItemLookups = ['Website Gold Dust', 'Website Introduction'];
        const titleKey = "Name (don't change after set)";
        const orFilter = [];

        for (const lookup of notionItemLookups) {
            orFilter.push({
                property: titleKey,
                rich_text: {
                    equals: lookup,
                },
            });
        }

        const query = {
            filter: {
                or: orFilter,
            },
        };

        const response = await callNotionApi(notionDbId, query);

        if (response.data.length === 0) {
            console.log('No item found');
        } else {
            const introData = {
                gold_dust: null,
                about_me: null,
            };

            for (const record of response.data) {
                const keyJoins = [titleKey, 'Details'];
                const resultArr = parseNotionResponse(record, keyJoins);

                if (resultArr[keyJoins[0]] === notionItemLookups[0]) {
                    introData.gold_dust = resultArr[keyJoins[1]];
                }
                if (resultArr[keyJoins[0]] === notionItemLookups[1]) {
                    introData.about_me = resultArr[keyJoins[1]];
                }
            }

            return introData;
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const parseNotionResponse = (record, propertiesToExtract) => {
    const resultArr = {};

    for (const key of propertiesToExtract) {
        let value = '';
        const columnElement = record.properties[key];

        if (columnElement.type === 'rich_text' && columnElement.rich_text.length !== 0) {
            for (const text of columnElement.rich_text) {
                value += removeCharacters(text.plain_text, []);
            }
        } else if (columnElement.type === 'number') {
            value = columnElement.number;
        } else if (columnElement.type === 'title') {
            value = columnElement.title[0].plain_text;
        }

        resultArr[key] = value;
    }

    return resultArr;
};

const removeCharacters = (string, separators) => {
    if (separators.length === 0) {
      return string.trim();
    }

    const pattern = "[" + separators.join('') + "]";
    const match = string.match(pattern);

    if (match) {
      const index = match.index;
      return string.substring(0, index).trim();
    } else {
      return string.trim();
    }
  };

const callNotionApi = async (notionDbId, query) => {
    try {
        const response = await axios.post('https://api.notion.com/v1/databases/'+notionDbId+'/query', query, {
            headers: {
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ process.env.NOTION_KEY,
            },

        });

        return response.data.results;
    } catch (error) {
        throw new Error('Failed to fetch data from Notion API');
    }
};

export default fetchHeadlineData;
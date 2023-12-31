import axios from 'axios';
import { Iprops } from './apiesType';
//
export const CallGPT = async ({
  contents,
  temperature,
  humid,
  weather,
}: {
  contents: string;
  temperature: string;
  humid: string;
  weather: string;
}) => {
  try {
    const messages = [
      {
        role: 'system',
        content:
          'You are a psychological advisor from now on. Proceed in the following order.',
      },
      {
        role: 'user',
        content: ` 1. the title of today after understanding the [events] separated by "" at th [title]: Think of bottom.
      2. [actionTips]: Write down 2 action tips that will be helpful in the future customer situation. The two action tips must be converted into JSON Array format. 
    
      translate into Korean and Use the output in the following JSON format:
      {
      title: here is [title],
      actionTips: here is [actionTips]
      }`,
      },
      {
        role: 'user',
        content: `
      ""
      나는 오늘 열정이 넘치고 울적한 날입니다. 날씨는 흐립니다. 식사는 2번 먹었습니다. ${contents}
      ""
      `,
      },
    ];

    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
        },
      }
    );

    const responseData = await res.data;
    console.log('responseData', responseData);

    const message = responseData.choices[0].message.content;
    console.log('message', message);

    return message;
  } catch (error) {
    console.log('CallGPT error', error);
  }
};

/* eslint-disable no-console */
import { SQSHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

import config from '../config/envConfig';
const ses = new AWS.SES({ region: config.AWS_REGION });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: SQSHandler = async (event): Promise<any> => {
  const record = event.Records[0];

  console.log('Record####', record);
  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'brat.tabusao@gmail.com',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

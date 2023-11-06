// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config().parsed;

interface ENV {
  AWS_REGION: string | undefined;
}

interface Config {
  AWS_REGION: string;
}

export const getConfig = (): ENV => {
  return {
    AWS_REGION: process.env.AWS_REGION,
  };
};

const getSanitezedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;

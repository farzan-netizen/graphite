 
import { exit } from 'process'

 
import { default as axios } from 'axios'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const { SLACK_BOT_URL, RELEASE_HOOK_SHARED_SECRET } = process.env

const opts = yargs(hideBin(process.argv))
  .version(false)
  .option('product', {
    alias: 'p',
    type: 'string',
    description: 'Name of the product',
    demandOption: true,
  })
  .option('version', {
    alias: 'v',
    type: 'string',
    description: 'product version',
    demandOption: true,
  })
  .option('author', {
    alias: 'a',
    type: 'string',
    description: 'Author of this build',
    demandOption: true,
  })
  .option('title', {
    alias: 't',
    type: 'string',
    description: 'Title of this build (e.g Commit Title)',
    demandOption: true,
  })
  .option('notes', {
    alias: 'n',
    type: 'string',
    description: 'Release notes of this release in markdown format',
    demandOption: true,
  })
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'URL of the pipeline',
    demandOption: true,
  })
  .option('channel', {
    alias: 'c',
    type: 'string',
    description: 'Release channel',
    demandOption: true,
  })
  .option('jobContext', {
    alias: 'j',
    type: 'string',
    description:
      'Job context that is prepended to jobId, usually the id of project and pipeline',
    demandOption: true,
  })
  .option('actions', {
    type: 'array',
    description: 'Job action in form of jobId|env|verb|label',
  })
  .option('endpoint', {
    type: 'string',
    description: 'Bot Endpoint',
    default: SLACK_BOT_URL,
  })
  .option('auth', {
    type: 'string',
    description: 'Bot Authentication Key',
    default: RELEASE_HOOK_SHARED_SECRET,
  })
  .help()
  .parse()

const {
  product,
  version,
  author,
  title,
  notes,
  url: pipelineUrl,
  channel: releaseChannel,
  endpoint,
  auth,
  jobContext,
} = opts

const changelog = notes.replace(/\\n/g, '\n')

let actions = []
if (!Array.isArray(opts.actions)) {
  actions.push(opts.actions)
} else {
  actions.push(...opts.actions)
}

actions = actions.map(act => {
  const [jobId, env, label] = act.split('/')
  if (!jobId || !env || !label) {
    console.error('actions is not in correct form')
    console.error({ jobId, env, label })
    exit(1)
  }
  return {
    jobId: `${jobContext},${jobId}`,
    env,
    label,
  }
})

const postData = {
  product,
  version,
  author,
  title,
  changelog: `${changelog}`,
  pipelineUrl,
  releaseChannel,
  actions,
}

console.log('Sending request...')
console.log(postData)

axios
  .post(
    endpoint,
    {
      ...postData,
    },
    {
      headers: {
        'X-Auth': auth,
      },
    },
  )
  .then(res => {
    console.log('Success')
    console.log(res.data)
  })
  .catch(err => {
    console.error('Failed')
    console.error(err.response?.data || err.message || err)
    exit(1)
  })


import { rest } from 'msw';
import * as path from 'path'
import * as fs from 'fs'


export const handlers = [
  rest.get('/video', (_, res, ctx) => {
    const videoBuffer = fs.readFileSync(
      path.resolve(__dirname, '../uploads/c83e23fc71e00de195b688dbb56a0849'),
    )
    return res(
      ctx.set('Content-Length', videoBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'application/json'),
      // Respond with the "ArrayBuffer".
      ctx.json(videoBuffer)
    )
  }),
  
]




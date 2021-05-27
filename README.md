# Slate

[![][docs-badge]][docs]

Unofficial [Slate](https://slate.host) API client for Deno. <img align="right" src="logo.png" />

## Example

```ts
import { Slate } from 'https://deno.land/x/slate/mod.ts'

const slate = new Slate({ apiKey: 'X-X-X' })

const { collections } = await slate.getUserData()

const { filename } = await slate.uploadFile('logo.png')
```

[docs-badge]: https://img.shields.io/github/v/release/deno-libs/node_http?color=yellow&label=Docs&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/node_http/mod.ts

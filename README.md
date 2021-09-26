# Slate

[![][docs-badge]][docs]

Unofficial Deno API client for [Slate](https://slate.host), an open source Filecoin-based storage system. <img align="right" src="logo.png" />

## Example

```ts
import { Slate } from 'https://deno.land/x/slate/mod.ts'

const slate = new Slate({ apiKey: 'X-X-X' })

const { collections } = await slate.getUserData()

const { filename } = await slate.uploadFile('logo.png')
```

[docs-badge]: https://img.shields.io/github/v/release/deno-web3/slate?color=yellow&label=Docs&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/slate/mod.ts

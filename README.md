# Slate

[![][docs-badge]][docs]

> I'm building [Flash](https://flash-dev.vercel.app) - a service to deploy websites and apps on the new decentralized stack.
>
> If you'd like to try or collab, [dm](https://t.me/v_1rtl) or [email](mailto:yo@v1rtl.site)

Unofficial Deno API client for [Slate](https://slate.host), an open source Filecoin-based storage system. <img align="right" src="logo.png" />

## Example

```ts
import { Slate } from 'https://deno.land/x/slate/mod.ts'

const slate = new Slate({ apiKey: 'X-X-X' })

const { collections } = await slate.getUserData()

const { filename } = await slate.uploadFile('logo.png')
```

[docs-badge]: https://img.shields.io/github/v/release/deno-web3/slate?color=yellow&label=Docs&logo=deno&style=flat-square&a
[docs]: https://doc.deno.land/https/deno.land/x/slate/mod.ts

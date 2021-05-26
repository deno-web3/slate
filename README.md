# Slate

Unofficial [Slate](https://slate.host) API client for Deno. <img align="right" src="logo.png" />

## Example

```ts
import { Slate } from 'https://deno.land/x/slate/mod.ts'

const slate = new Slate({ apiKey: 'X-X-X' })

const { collections } = await slate.getUserData()
```

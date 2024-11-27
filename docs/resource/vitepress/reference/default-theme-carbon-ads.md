# Carbon Ads

::: details Source text
https://github.com/vuejs/vitepress/blob/3c40e9d9a8443433f49599111ee571d569de530d/docs/en/reference/default-theme-carbon-ads.md
:::

VitePress has built in native support for [Carbon Ads](https://www.carbonads.net/). By defining the Carbon Ads credentials in config, VitePress will display ads on the page.

```js
export default {
  themeConfig: {
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    }
  }
}
```

These values are used to call carbon CDN script as shown below.

```js
`//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
```

To learn more about Carbon Ads configuration, please visit [Carbon Ads website](https://www.carbonads.net/).

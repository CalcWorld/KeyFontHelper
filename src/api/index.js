import { Response_ } from './_Response.js';
import { config, text2KeyFont, text2KeyFontBySeries } from '../index.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/html') {
      const type = url.searchParams.get('type');
      const text = url.searchParams.get('text');
      const title = url.searchParams.get('title') === '1';
      const ariaLabel = url.searchParams.get('ariaLabel') === '1';
      const option = { title, ariaLabel };
      try {
        if (type === 'series') {
          const series = url.searchParams.get('series');
          return Response_.jsonSuccess({
            html: text2KeyFontBySeries(series, text, option),
          });
        } else if (type === 'font') {
          const font = url.searchParams.get('font');
          return Response_.jsonSuccess({
            html: text2KeyFont(font, text, option),
          });
        } else {
          throw new Error(`Unknown type: ${type}`);
        }
      } catch (e) {
        return Response_.jsonError({
          msg: e.message,
        });
      }
    } else if (url.pathname === '/api/config') {
      const type = url.searchParams.get('type');
      if (type === 'series') {
        const series = url.searchParams.get('series');
        return Response_.jsonSuccess({
          config: config.filter(i => i.series === series),
        });
      } else if (type === 'font') {
        const font = url.searchParams.get('font');
        return Response_.jsonSuccess({
          config: config.filter(i => i.font === font),
        });
      }
      return Response_.jsonSuccess({ config });
    }

    return env.ASSETS.fetch(request);
  },
};

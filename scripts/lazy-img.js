const cheerio = require('cheerio');
const sizeOf = require('image-size');

hexo.extend.filter.register('after_render:html', function(data, value) {
  const $ = cheerio.load(data);

  $('*').each(function() { 
    if ($(this).is('img') && $(this).attr('src')) {
      $(this).attr('loading', 'lazy');
      if (!$(this).attr('width') && !$(this).attr('height')) {
        const localFile = `${value.page.asset_dir}${$(this).attr('src')}`;
        try {
          const dimensions = sizeOf(localFile);
          if (dimensions && dimensions.width && dimensions.height) {
            $(this).attr('width', dimensions.width);
            $(this).attr('height', dimensions.height);
          }
        } catch (e) {
          // console.error(e.stack);
        }
      }
    }
  });

  return $.html();

  // // if (value && value.page && value.page.thumbnail && value.page.thumbnail.indexOf('/') > 0) {
  // //   const thumpImg = value.page.thumbnail.substring(value.page.thumbnail.indexOf('/') + 1)
  // //   data = data.replace(new RegExp(`(?!<img src="${thumpImg}")<img `, 'g'), '<img loading="lazy" ');
  // // } else {
  //   data = data.replace(/<img /g, '<img loading="lazy" ');
  // // }
  // return data;
});

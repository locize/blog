hexo.extend.filter.register('after_render:html', function(data, value) {
  if (value && value.page && value.page.thumbnail && value.page.thumbnail.indexOf('/') > 0) {
    const thumpImg = value.page.thumbnail.substring(value.page.thumbnail.indexOf('/') + 1)
    data = data.replace(new RegExp(`(?!<img src="${thumpImg}")<img `, 'g'), '<img loading="lazy" ');
  } else {
    data = data.replace(/<img /g, '<img loading="lazy" ');
  }
  return data;
});

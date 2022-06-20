const ejs = require('ejs');
const { stripHTML, escapeHTML } = require('hexo-util');

const organisationTemplateContent = `<script type="application/ld+json">
{ "@context": "http://schema.org",
  "@type": "Organization",
  "name": "locize",
  "url": "https://locize.com",
  "logo": "https://locize.com/img/locize_color.svg",
  "sameAs": [""]
}
</script>`;
const websiteTemplateContent = `<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "locize",
  "url": "https://locize.com/blog/",
  "logo": "https://locize.com/blog/images/locize_color.svg"
}
</script>`;

const articleTemplateContent = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "<%= pageUrl %>"
  },
  "headline": "<%= headline %>",
  "description": "<%= description %>",
  "image": "<%= imageUrl %>",  
  "author": {
    "@type": "Organization",
    "name": "locize",
    "url": "https://locize.com"
  },  
  "publisher": {
    "@type": "Organization",
    "name": "locize",
    "logo": {
      "@type": "ImageObject",
      "url": "https://locize.com/blog/images/locize_color.svg"
    }
  },
  "datePublished": "<%= datePublished %>",
  "dateModified": "<%= dateModified %>"
}
</script>`;

const getWebsiteStructuredData = (hexo) => {
  const data = {
    // 'name': config.title,
    // 'url': config.url
  };
  return getCompiledContent(websiteTemplateContent, data);
};

const getOrganizationStructuredData = (hexo) => {
  const data = {
    // 'name': config.seo_structured_data.organization.name,
    // 'url': config.seo_structured_data.organization.url,
    // 'logoUrl': config.seo_structured_data.organization.logoUrl
  };
  return getCompiledContent(organisationTemplateContent, data);
};

const getArticleStructuredData = (hexo) => {
  let description = hexo.page.description || hexo.page.excerpt || hexo.page.content;
  if (description) {
    // Remove prefixing/trailing spaces and replace new lines by spaces
    description = escapeHTML(stripHTML(description).substring(0, 200).trim()).replace(/\n/g, ' ');
  }

  const thumbnail = getThumbnailUrl(hexo.page);
  
  const data = {
    pageUrl: hexo.page.permalink,
    headline: hexo.page.title,
    description: description,
    imageUrl: thumbnail ? ('https://locize.com/blog/' + thumbnail) : 'https://locize.com/blog/images/locize_color.svg',
    datePublished: hexo.page.date.toISOString(),
    dateModified: hexo.page.updated.toISOString()
  };
  return getCompiledContent(articleTemplateContent, data);
};

const getCompiledContent = (templateContent, data) => {
  var compiledTemplate = ejs.compile(templateContent);
  return compiledTemplate(data);
};

const getThumbnailUrl = (post) => {
  var url = post.thumbnail || '';
  if (!url) {
      var imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/ig;
      var result = imgPattern.exec(post.content);
      if (result && result.length > 1) {
          url = result[1];
      }
      if(url.length > 0) {
          var pattern = /^[\\{0,1}\/{0,1}]([^\/^\\]+)/,
              pattern_ = /([^\/^\\]+)/;
          if ((ret = pattern.exec(url)) != null) {
              if(ret[0].length == url.length) {
                  url = post.path + ret[1];
              }
          } else if ((ret = pattern_.exec(url)) != null) {
              if(ret[0].length == url.length) {
                  url = post.path + ret[1];
              }
          }
      }
  }
  return url;
}

hexo.extend.helper.register('seoStructuredData', function () {
  const sections = [
    getOrganizationStructuredData(this),
    getWebsiteStructuredData(this)
  ];
  if (this.page.title) {
    sections.push(getArticleStructuredData(this));
  }
  return sections.join('\n');
});

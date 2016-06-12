title: API
docs: true
hideTitle: true
noDate: true
---

Do you prefer to integrate the locize api on your own?

No problem! If you want to make a low level integration or just did not found an appropriate client library here you have our simple api description:

<h4 class="headline"><i class="material-icons" translated>code</i> Fetch the namespace resources</h4>

The most important feature first!

It's a simple HTTP GET request with this url pattern:

`https://api.locize.io/{projectId}/{version}/{language}/{namespace}`

<h5>example:</h5>

```sh
curl -X GET https://api.locize.io/3d0aa5aa-4660-4154-b6d9-907dbef10bb2/production/en/landingpage
# will return something like:
# {
#   "Average App": "Average App",
#   "Benefits": "Benefits",
#   "Blog": "Blog",
#   ...
#   "privacy policy": "privacy policy",
#   "terms of service": "terms of service"
# }
```


<h4 class="headline"><i class="material-icons" translated>code</i> Fetch the available languages</h4>

You have the possibility to ask locize which languages are available for a particular project.
That way you can have a dynamic language selector.

It's an even simpler HTTP GET request with this url pattern:

`https://api.locize.io/languages/{projectId}`

<h5>example:</h5>

```sh
curl -X GET https://api.locize.io/languages/3d0aa5aa-4660-4154-b6d9-907dbef10bb2
# will return something like:
# {
#   "en": {
#     "name": "English",
#     "nativeName": "English",
#     "translated": {
#       "latest": 1,
#       "production": 1
#     }
#   },
#   "de-CH": {
#     "name": "German",
#     "nativeName": "Deutsch",
#     "region": "CH",
#     "translated": {
#       "latest": 1,
#       "production": 0.521
#     }
#   },
#   "it": {
#     "name": "Italian",
#     "nativeName": "Italiano",
#     "translated": {
#       "latest": 1,
#       "production": 1
#     }
#   },
#   ...
# }
```


<h4 class="headline"><i class="material-icons" translated>code</i> Missing translations</h4>

You can say to locize that some translations are missing.
For example this is very useful in development.

This is a little bit more advanced. It's a HTTP POST request with this url pattern:

`https://api.locize.io/missing/{projectId}/{version}/{language}/{namespace}`

<h5>example:</h5>

```sh
body=$(cat  << EOF
{
    "new.key":  "default value",
    "another.new.key":  "another default value"
}
EOF
)

curl -X POST -H "Content-Type: application/json" -H "Authorization: mysecret-very-4f2e-b123-d432d86430c6" -d $body https://api.locize.io/missing/3d0aa5aa-4660-4154-b6d9-907dbef10bb2/latest/en/landingpage
```


<div class="contact">
<hr />
<p class="callout extra-margin">Have questions? <strong><a href="mailto:support@locize.com">Contact us!</a></strong></p>
</div>

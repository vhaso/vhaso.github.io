---
layout: page
title: Projects
permalink: /projects/
---
These are the recent projects that I have been a part of.
{% for project in site.projects reversed %}
---
### {{project.title}}
{{project.abstract}}
{% assign project_content = project.content | strip_newlines %}
{% unless project_content == "" %}
[Read more...]({{project.url}})
{% endunless %}
{% if project.external_links %}
**External links:**
{% for link in project.external_links %}
- <a href="{{link.url}}" target="_blank">{{link.text}}</a>
{% endfor %}
{% endif %}
{% endfor %}
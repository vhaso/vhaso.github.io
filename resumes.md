---
layout: page
title: Resume
permalink: /resumes/
---
My resume can be downloaded in different languages here:
{% for resume in site.resumes %}
- <a href="{{resume.location}}" download>**{{resume.language}} version**</a>
{% endfor %}
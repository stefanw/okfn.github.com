---
title: Labs Projects
layout: default
bodyclass: code
---

# Labs Projects

<form class="form-inline hidden" id="filters">
  <button type="button" class="btn btn-primary active" data-filter="featured*=true">Featured</button>
  <button type="button" class="btn btn-primary" data-filter="helpwanted*=true">Help wanted</button>
  <div class="btn-group type"></div>
  <div class="btn-group tags"></div>
  <div class="btn-group status"></div>
  <div class="btn-group language"></div>
</form>

<div class="projects">
  {% for project in site.categories.projects %}
    <div class="record" data-featured="{{project.featured}}" data-helpwanted="{{project.helpwanted}}" data-status="{{project.status}}" data-language="{{ project.language | join: ";" }}" data-type="{{ project.type | join: ";" }}" data-tags="{{ project.tags | join: ";" }}" data-url="{{project.url | replace:'index.html',''}}">
      <h2>
        <a href="{{project.url | replace:'index.html',''}}">{{project.title}}{% if project.tagline %}
            – {{project.tagline}}
          {% endif %}
        </a>
        {% if project.author %}
        <div class="author">maintained by {{project.author}}</div>
        {% endif %}
      </h2>
      {% if project.imageurl %}
        <img src="{{project.imageurl}}" alt="{{project.title}}" />
      {% endif %}

      <p class="description">{{project.content}}</p>
      {% if project.github_repo %}
        <p><img src="/img/github.png" /> <a href="https://github.com/{{project.github_user}}/{{project.github_repo}}">Github</a></p>
      {% endif %}
    </div>
  {% endfor %}
</div>


<script type="text/javascript" src="../js/isotope.pkgd.js"></script>
<script type="text/javascript" src="../js/imagesloaded.pkgd.js"></script>
<script type="text/javascript" src="../js/projects.js"></script>


<template>
  <div class="index">
    <div class="index-banner">
      <a-row align="middle" justify="space-around" type="flex">
        <a-col :span="8">
          <div class="index-banner-content">
            <h2>Eclipse Vert.x</h2>
            <h5>是一个用于在JVM上构建响应式应用程序的工具包</h5>
            <a-button icon="download" size="large" type="primary" @click="onDownload">下载v3.8.2</a-button>
          </div>
        </a-col>
        <a-col :span="12">
          <lottie
            z-index="100"
            :options="indexBannerOptions"
            :height="200"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
          <div class="index-banner-inset">
            <a-icon type="sync" spin/>
            <h2>Reactive</h2>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="index-event">
      <a-row align="middle" justify="center" type="flex">
        <a-col :span="8">
          <div class="index-event-content">
            <h2>
              <a-icon type="alert"/>&nbsp;事件驱动
            </h2>
            <p>
              Eclipse Vert.x是<strong>事件驱动</strong>的。
              <br>这意味着您的应用程序可以使用少量内核线程处理大量并发。Vert.x可让您的应用程序以最少的硬件进行扩展。
            </p>
          </div>
        </a-col>
        <a-col :span="6">
          <lottie
            z-index="100"
            :options="indexEventOptions"
            :height="360"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
        </a-col>
      </a-row>
    </div>
    <div class="index-non-blocking">
      <a-row align="middle" justify="center" type="flex">
        <a-col :span="6">
          <lottie
            z-index="100"
            :options="indexNonBlockingOptions"
            :height="360"
            :width="400"
            v-on:animCreated="handleAnimation"
          />
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8">
          <div class="index-non-blocking-content">
            <h2>
              <a-icon type="thunderbolt"/>&nbsp;非阻塞
            </h2>
            <p>
              Eclipse Vert.x是<strong>非阻塞</strong>的。
              <br>这意味着您的应用程序可以使用少量内核线程处理大量并发。Vert.x可让您的应用程序以最少的硬件进行扩展。
            </p>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="index-polyglot">
      <a-row justify="center" type="flex">
        <a-col :span="9">
          <div class="index-polyglot-code">
            <a-tabs defaultActiveKey="Java" size="small">
              <a-tab-pane tab="Java" key="Java">
                <vue-simple-markdown :source="javaCode"></vue-simple-markdown>
              </a-tab-pane>
              <a-tab-pane tab="JavaScript" key="JavaScript">
                <vue-simple-markdown :source="jsCode"></vue-simple-markdown>
              </a-tab-pane>
              <a-tab-pane tab="Groovy" key="Groovy">
                <vue-simple-markdown :source="groovyCode"></vue-simple-markdown>
              </a-tab-pane>
              <a-tab-pane tab="Ruby" key="Ruby">
                <vue-simple-markdown :source="rubyCode"></vue-simple-markdown>
              </a-tab-pane>
              <a-tab-pane tab="Scala" key="Scala">
                <vue-simple-markdown :source="scalaCode"></vue-simple-markdown>
              </a-tab-pane>
              <a-tab-pane tab="Kotlin" key="Kotlin">
                <vue-simple-markdown :source="kotlinCode"></vue-simple-markdown>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="8">
          <div class="index-polyglot-content">
            <h2>
              <a-icon type="deployment-unit"/>&nbsp;多语言支持
            </h2>
            <p>
               Java / JavaScript / Groovy / Ruby / Scala / Kotlin.
            </p>
            <p>
              Vert.x眼里<strong>没有最好的语言，只有最合适的语言.</strong>
            </p>
            <p>
              Vert.x社区会为所有语言提供完全等价的API.
            </p>
         </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import * as indexBannerData from "../assets/animation/index-banner-animation.json";
import * as indexEventData from "../assets/animation/index-event-animation.json";
import * as indexNonBlockingData from "../assets/animation/index-non-blocking-animation.json";

export default {
  data() {
    return {
      indexBannerOptions: { animationData: indexBannerData.default },
      indexEventOptions: { animationData: indexEventData.default },
      indexNonBlockingOptions: { animationData: indexNonBlockingData.default },
      animationSpeed: 1,
      anim: {},
      downloadUrl: "https://vertx.io/download/",
      javaCode: `
      \`\`\` java
      import io.vertx.core.AbstractVerticle;

      public class Server extends AbstractVerticle {
        public void start() {
          vertx.createHttpServer().requestHandler(req -> {
            req.response()
              .putHeader("content-type", "text/plain")
              .end("Hello from Vert.x!");
          }).listen(8080);
        }
      }
      \`\`\`
      `,
      jsCode: `
      \`\`\` js
      vertx.createHttpServer()
        .requestHandler(function (req) {
          req.response()
            .putHeader("content-type", "text/plain")
            .end("Hello from Vert.x!");
      }).listen(8080);
      \`\`\`
      `,
      groovyCode: `
      \`\`\` groovy
      vertx.createHttpServer().requestHandler({ req ->
        req.response()
          .putHeader("content-type", "text/plain")
          .end("Hello from Vert.x!")
      }).listen(8080)
      \`\`\`
      `,
      rubyCode: `
      \`\`\` ruby
      $vertx.create_http_server().request_handler() { |req|
        req.response()
          .put_header("content-type", "text/plain")
          .end("Hello from Vert.x!")
      }.listen(8080)
      \`\`\`
      `,
      scalaCode: `
      \`\`\` scala
      import io.vertx.lang.scala.ScalaVerticle

      class Server extends ScalaVerticle {
        override def start(): Unit = {
          vertx
            .createHttpServer()
          .requestHandler(_.response()
            .putHeader("content-type", "text/plain")
            .end("Hello from Vert.x"))
          .listen(8080)
        }
      }}
      \`\`\`
      `,
      kotlinCode: `
      \`\`\` kotlin
      import io.vertx.core.AbstractVerticle

      class Server : AbstractVerticle() {
        override fun start() {
          vertx.createHttpServer()
            .requestHandler { req ->
              req.response()
                .putHeader("content-type", "text/plain")
                .end("Hello from Vert.x")
            }.listen(8080)
        }
      }
      \`\`\`
      `
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    onDownload() {
      window.location.href = this.downloadUrl;
    }
  }
};
</script>


<style lang="less" scoped>
@import "../antd-variables";

.index {
}
.index-banner {
  width: 100%;
  height: 93vh;
  background: url("../assets/image/index-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.index-banner-content {
  margin-top: 38vh;
}
.index-banner-content h2 {
  font-size: 5em;
  color: @primary-color;
}
.index-banner-content h5 {
  font-size: 3em;
  color: @primary-color;
}
.index-banner-inset {
  font-size: 22em;
  text-align: center;
  color: #ffffff;
}
.index-banner-inset h2 {
  font-size: 0.2em;
  color: #ffffff;
}
.index-event {
  color: @primary-color;
  font-size: 1.5em;
}
.index-event-content {
  height: 50vh;
  display: table-cell;
  vertical-align: middle;
}
.index-event-content h2 {
  color: @primary-color;
  font-size: 1.5em;
}
.index-non-blocking {
  background-color: @primary-color;
  color: #ffffff;
  font-size: 1.5em;
}
.index-non-blocking-content {
  height: 50vh;
  display: table-cell;
  vertical-align: middle;
}
.index-non-blocking-content h2 {
  color: #ffffff;
  font-size: 1.5em;
}
.index-polyglot {
  height: 66vh;
  color: @primary-color;
  font-size: 1.5em;
}
.index-polyglot-code {
  margin-top: 20%;
  margin-top: 10%;
  text-align: left;
}
.index-polyglot-content {
  height: 60vh;
  text-align: right;
  display: table-cell;
  vertical-align: middle;
}
.index-polyglot-content h2 {
  color: @primary-color;
  font-size: 1.5em;
}
.vue-simple-markdown {
  margin-top: -6%;
  margin-left: -30px;
}
</style>

<template>
  <div class="awesome">
    <a-row align="top" justify="space-around" type="flex">
      <a-col :span="2"></a-col>
      <a-col :span="12">
        <a-tabs v-model="awesomeGroupKey" size="large">
          <template v-for="awesomeGroup in awesomeGroups">
            <a-tab-pane :key="awesomeGroup.key">
              <template slot="tab">
                <span>
                  <a-icon :type="awesomeGroup.icon"/>
                  {{awesomeGroup.name}}
                </span>
              </template>
              <template v-if="awesomeGroup.awesomeGroups.length == 0">
                <a-list :dataSource="awesomeGroup.awesomes">
                  <a-list-item slot="renderItem" slot-scope="awesomes" key="awesomes.name">
                    <a-list-item-meta :description="awesomes.author">
                      <template slot="title">
                        <a :href="awesomes.url">{{awesomes.name}}</a>
                      </template>
                      <template slot="description">
                        <template v-for="author in awesomes.author">{{author}},</template>
                      </template>
                    </a-list-item-meta>
                    {{awesomes.description}}
                  </a-list-item>
                </a-list>
              </template>
            </a-tab-pane>
          </template>
        </a-tabs>
      </a-col>
      <a-col :span="6">
        <a-list
          header="目录"
          itemLayout="vertical"
          size="small"
          :split="false"
          :dataSource="awesomeGroups"
        >
          <a-list-item slot="renderItem" slot-scope="awesomeGroup">
            <a @click="onClickCatalog(awesomeGroup.key)">
              <a-icon :type="awesomeGroup.icon"/>
              {{awesomeGroup.name}}
            </a>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import awesomeGroups from "../../assets/data/awesome";
export default {
  data() {
    return {
      awesomeGroupKey: "books",
      awesomeGroups: awesomeGroups
    };
  },
  methods: {
    onClickCatalog(key) {
      this.awesomeGroupKey = key;
    }
  }
};
</script>

<style lang="less" >
.awesome {
  margin-top: 20px;
}
.awesome .ant-list-vertical .ant-list-item-content {
  margin: 0 !important;
}
.awesome a {
  font: 1.1em sans-serif;
}
</style>
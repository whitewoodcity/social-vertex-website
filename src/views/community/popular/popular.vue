<template>
    <div class="article-list">
        <a-list itemLayout="vertical" size="large" :dataSource="listData">
            <div slot="footer"><b>ant design vue</b> footer part</div>
            <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                <template slot="actions" v-for="{type, text} in actions">
                      <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{text}}
                      </span>
                </template>
                <img slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                <a-list-item-meta
                        :description="item.description"
                >
                    <a slot="title" :href="item.href">{{item.title}}</a>
                    <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                {{item.content}}
            </a-list-item>
        </a-list>
    </div>
</template>
<script>
    const listData = []
    for (let i = 0; i < 1; i++) {
        listData.push({
            href: 'https://vue.ant.design/',
            title: `ant design vue part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        })
    }
    export default {
        data () {
            return {
                listData,
                pagination: {
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        }
    }
</script>
<style scoped>
    .article-list{
        margin-left: 30px;
    }
</style>
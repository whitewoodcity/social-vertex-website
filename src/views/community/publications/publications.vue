<template>
    <div class="articles-view">
        <a-row>
            <div class="search-bar">
                <a-col :span="5">
                    <a-input-search class="search-input" placeholder="input search text" enterButton/>
                </a-col>
                <a-col :span="4">
                    <a-dropdown>
                        <a-button>选择搜索专题</a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a>文章</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a>问答</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-col>
            </div>
        </a-row>
        <div class="nav-bar">
            <a-tabs size="large" >
                <a-tab-pane tab="推荐" key="1"><recomondation/></a-tab-pane>
                <a-tab-pane tab="关注" key="2"><following/></a-tab-pane>
                <a-tab-pane tab="最热" key="3"><popular/></a-tab-pane>
                <a-tab-pane tab="问答" key="4"><questions/></a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
    import Recomondation from './recomondation/recomondation'
    import Following from './following/following'
    import Popular from './popular/popular'
    import Questions from './questions/questions'
    export default {
        components:{Recomondation,Following,Popular,Questions},
        beforeMount() {
            let loggedIn = this.$store.getters.loggedIn;
            if (!loggedIn) {
                this.$router.push("/login");
            }
        }
    }
</script>
<style scoped>
    .articles-view{
        padding-left: 20px;
        padding-top: 20px;
    }
</style>
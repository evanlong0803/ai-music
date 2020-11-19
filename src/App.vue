<template>
    <div id="app">
        <!-- ondragstart 禁止图片拖动 -->
        <Home ondragstart="return false" />
    </div>
</template>

<script>
import Home from './components/Home';

export default {
    name: 'app', // 主组件名
    components: {
        Home
    }
};
</script>

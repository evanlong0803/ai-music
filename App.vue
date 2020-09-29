<template>
    <div>
        <Row :space-y="5">
            <Cell width="24">
                <div v-height="150">
                    <h2 class="top">Animate.css动画演示</h2>
                </div>
            </Cell>
            <Cell width="24">
                <div v-height="250" class="center">
                    <div>Animate.css</div>
                    <p>V3.7.2 —— CSS3动画库</p>
                </div>
            </Cell>
            <Cell width="24">
                <div v-height="250" class="bottom">
                    <Navs class="Navs"></Navs>
                </div>
            </Cell>
        </Row>
    </div>
</template>

<style lang="less">
.h-row {
    padding: 10px 10px;
}

.h-row > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: #fff;
    border-radius: 3px;
    background-color: @gray-color;
}

.h-row .top {
    font: 32px 'Microsoft Yahei';
    color: black;
}

.h-row .center div {
    font: 96px 'Microsoft Yahei';
    font-weight: 500;
    color: #f35626;
}

.h-row .center p {
    font: 30px 'Microsoft Yahei';
    color: #999;
    margin: 0;
}

.h-row .bottom {
    width: 1000px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}
</style>

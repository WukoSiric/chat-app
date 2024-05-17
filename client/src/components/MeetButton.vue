<script>
import ForumOutlines from '../assets/svg/ForumOutlines.vue'; 

export default { 
    components: {
        ForumOutlines
    }
};
</script>
<template>
    <div class="meet">
        <ForumOutlines id="forum-outlines" />
        <h1>Meet</h1>
    </div>
</template>

<style>

.meet {
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 0px 20px;
    transition: transform 5s;
}

.meet h1 { 
    font-size: 43px;
    color: #6841F2;
    margin: 0px;
    padding: 0px;
}

.meet h1:hover { 
    text-decoration: underline;
    transform: scale(1.05);
}

#forum-outlines {
    width: 50px;
    height: 50px;
    margin: 0px 10px;
    fill: #6841F2;
}
</style>
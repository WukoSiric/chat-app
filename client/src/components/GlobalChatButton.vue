<script>
import EarthIcon from '../assets/svg/EarthIcon.vue'; 

export default { 
    components: {
        EarthIcon
    }
};
</script>
<template>
    <div class="meet">
        <EarthIcon id="earth-icon" />
        <h1>Global Chat</h1>
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
    user-select: none;
}

.meet h1:hover { 
    text-decoration: underline;
    transform: scale(1.05);
}

#earth-icon {
    width: 50px;
    height: 50px;
    margin: 0px 10px;
    fill: #6841F2;
}
</style>
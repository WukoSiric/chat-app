<script>
import CogOutline from '../assets/svg/CogOutline.vue';

export default {
    name: 'UserSection',
    components: {
        CogOutline
    }
};
</script>
<template>
    <div class="user-section">
        <CogOutline id='cog-outline '/>
        <p>Username</p>
    </div>
</template>
<style>
.user-section { 
    display: flex; 
    padding: 100px;
}

#cog-outline { 
    width: 30px;
    height: 30px;
    fill: yellow; 
}
</style>


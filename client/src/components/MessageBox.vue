<script>
export default {
    props: {
        isReceived: {
            type: Boolean,
            default: false,
            required: false
        },
        message: {
            type: String, 
            default: "Message is loading...", 
            required: true
        }
    }  
};
</script>
<template>
    <div class="messageBox" :class='{foreign : isReceived}'>
        {{  isReceived ? 'Foreign: ' : 'Local: ' }}
        {{ message }}
    </div>
</template>
<style> 

.messageBox { 
    background-color: #262626;
    padding: 15px;
    border-radius: 25px;
    width: 90%;
    margin: 20px 0px;
    font-size: 12pt;
    /* Text color  */
}

.foreign {
    background-color: #261464;
}
</style>
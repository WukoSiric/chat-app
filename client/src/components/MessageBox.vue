<script>
export default {
    props: {
        isReceived: {
            type: Boolean,
            default: false,
            required: false
        },
        messageObject: {
            type: Object,
            required: true
        }
    }  
};
</script>
<template>
    <div class="messageBox" :class='{foreign : isReceived}'>
        <span id="username">{{  isReceived ? messageObject.username : 'You' }}:</span>
        {{ messageObject.message }}
    </div>
</template>
<style> 

.messageBox { 
    background-color: #262626;
    padding: 15px;
    border-radius: 25px;
    width: 90%;
    margin: 10px 0px;
    font-size: 12pt;
    box-shadow: 10px 5px 10px #00000021;
    /* Text color  */
}

.foreign {
    background-color: #261464;
    align-self: start;
}

#username {
    font-weight: bold;
    color: #e4c553;
    margin-right: 10px;
    font-size: 14pt;
}
</style>
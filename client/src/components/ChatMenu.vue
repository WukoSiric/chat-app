<script>
import SearchBox from './SearchBox.vue';
import MeetButton from './MeetButton.vue';
import GlobalChatButton from './GlobalChatButton.vue';
import UserSection from './UserSection.vue';

export default {
	components: {
		SearchBox,
		MeetButton,
		GlobalChatButton,
		UserSection
	}
};
</script>
<template>
	<div class='menu'>
		<MeetButton id="meet" />
		<GlobalChatButton id="global-chat" />
		<SearchBox id="search-box" :modelValue='query' placeholder='Search' />
		<div class="spacer"></div>
		<UserSection id="user-section" />
	</div>
</template>
<style>
/* Menu  */
.menu {
	background-color: #191919;
	background-image:
		radial-gradient(circle at -15vw -40vh, #f2d54152, #191919 45%);
	background-repeat: no-repeat;
	height: 100vh;
	display: grid;
	grid-template-areas:
		"meet"
		"global-chat"
		"search-box"
		"spacer"
		"footer"
	;
	grid-template-rows: auto auto auto 2fr auto;
	grid-gap: 1px;
}

.menu>#meet {
	grid-area: meet;
}

.menu>#global-chat {
	grid-area: global-chat;
}

.menu>#search-box {
	grid-area: search-box;
	justify-self: center;
}

.menu>.spacer {
	grid-area: spacer;
}

.menu>#footer {
	grid-area: footer;
}
</style>
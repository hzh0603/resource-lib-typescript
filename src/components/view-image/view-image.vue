<template>
	<ul id="images">
		<li v-for="item in imageList" :key="item">
			<img :src="item" class="img-list">
		</li> 
	</ul>
</template>

<script lang="ts" src="./view-image.ts" />
<style lang="scss" src="./view-image.scss" />

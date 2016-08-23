<?php
	header("Content-type: application/vnd-ms-excel");

    $linkId = $_GET['linkId'];

    header("Content-Disposition: attachment; filename=doc".explode(".",$linkId)[0].".xls");

	include 'files/'.$linkId;
?>
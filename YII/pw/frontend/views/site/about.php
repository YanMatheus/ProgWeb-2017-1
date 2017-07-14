<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        Testando
    </p>

    <p>This is the About page. You may modify the following file to customize its content:</p>

    <p>
        <?= "Dia e hora atual: " . $dataAtual; ?>
    </p>
    <code><?= __FILE__ ?></code>
</div>

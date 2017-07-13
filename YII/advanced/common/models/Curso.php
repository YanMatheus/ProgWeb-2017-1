<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "curso".
 *
 * @property integer $id
 * @property string $nome
 * @property string $sigla
 * @property string $descricao
 */
class Curso extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'curso';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['nome', 'sigla', 'descricao'], 'required', 'message'=>'Este campo é obrigatório'],
      //      [['id'], 'integer'],
            [['descricao'], 'string'],
            [['nome'], 'string', 'max' => 100],
            [['sigla'], 'string', 'max' => 4],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'sigla' => 'Sigla',
            'descricao' => 'Descricao',
        ];
    }


    public function getUsers()
    {
        return $this->hasMany(
          Users::className(), ['id_curso' => 'id']
        );
    }
}

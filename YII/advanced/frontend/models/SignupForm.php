<?php
namespace frontend\models;

use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $id_curso;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Esse nome de usuário já existe'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['id_curso', 'trim'],
            ['id_curso', 'required', 'message'=>'Selecione um curso'],
        //  ['id_curso', 'unique', 'targetClass' =>'\common\models\User'],

            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'Esse endereço de e-mail já existe'],


            ['password', 'required'],
            ['password', 'string', 'min' => 6],

        ];
    }
    public function attributeLabels()
    {
      return [
        'username' => 'Nome do usuário',
        'Email' => 'E-mail',
        'id_curso' => 'Curso',
        'senha' => 'Senha'

      ];
    }
    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->id_curso = $this->id_curso;
        $user->setPassword($this->password);
        $user->generateAuthKey();

        return $user->save() ? $user : null;
    }
}

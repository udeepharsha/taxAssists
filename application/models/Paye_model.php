<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Paye_model extends CI_Model {


	public function __construct() {
		parent::__construct();
		$this -> load -> database();
	}


    public function addNewEmployee($datau){
        $this->db->from('paye_employee');
        $this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        $data_length = count($data);

        if($data_length == 0){
            echo $this->db->insert('paye_employee', $datau);
        }
        else{
            $this->db->where('user_id',$this->session->userdata('user_id'));
            echo $this->db->update('paye_employee', $datau);
        }   
    }

    public function submitPayMonthly($datau){
        $this->db->from('paye_monthly');
        $this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        $data_length = count($data);

        if($data_length == 0){
            echo $this->db->insert('paye_monthly', $datau);
        }
        else{
            $this->db->where('user_id',$this->session->userdata('user_id'));
            echo $this->db->update('paye_monthly', $datau);
        }  
    }

    public function archiveForMonth($datau){
        $this->db->from('paye_monthly_archives');
        $this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        $data_length = count($data);

        if($data_length == 0){
            echo $this->db->insert('paye_monthly_archives', $datau);
        }
        else{
            $this->db->where('user_id',$this->session->userdata('user_id'));
            echo $this->db->update('paye_monthly_archives', $datau);
        } 
    }

    public function loadPayEmployee(){
        $this->db->from('paye_employee');
        $this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        return $data;
    }

    public function removeEmployee($datau){
        $this->db->where('user_id',$this->session->userdata('user_id'));
        echo $this->db->update('paye_employee', $datau);
    }

    public function saveEditedEmployee($datau){
        $this->db->where('user_id',$this->session->userdata('user_id'));
        echo $this->db->update('paye_employee', $datau);
    }

	
}
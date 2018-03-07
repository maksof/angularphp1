<?php
/**
 * CSRF Protection Class
 */
class CSRF_Protection
{
  /**
   * Holds CI instance
   *
   * @var CI instance
   */
  private $CI;
 
  // -----------------------------------------------------------------------------------
 
  public function __construct()
  {
    $this->CI =& get_instance();
  }

    public function validate_request() {
      // Is this a post request?
      if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $this->CI->load->config('config');
        $config = $this->CI->config->config;
        $protocol = $config['protocol'];

        if (isset($_SERVER['HTTP_ORIGIN'])) {

            $address = $protocol . $_SERVER['SERVER_NAME'];
            $referrerAddress = $_SERVER['HTTP_ORIGIN'].'/';

            if (strpos($address, $_SERVER['HTTP_ORIGIN']) !== 0) {
              exit(json_encode(['status' => 'REJECTED', 'error' => 'Invalid Origin header:']));
            } else if (strpos($referrerAddress, $_SERVER['HTTP_REFERER']) !== 0 && $config['state'] == 'PRODUCTION') {
              exit(json_encode(['status' => 'REJECTED', 'error' => 'Invalid Referrer Address']));
            }
        } else {
            exit(json_encode(['status' => 'REJECTED', 'error' => 'No Origin header:']));
        }
      }
    }

}